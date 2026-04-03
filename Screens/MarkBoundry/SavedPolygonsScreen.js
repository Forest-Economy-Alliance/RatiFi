import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { VasernDB } from '../../vasern';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import { useTranslation } from 'react-i18next';

const BG_IMG_PATH = require('../../assets/images/background.png');

const SavedPolygonsScreen = ({ navigation }) => {
  const { profile } = useSelector(state => state.entities.auth.userInfo);
  const [savedPolygons, setSavedPolygons] = useState([]);
  const [selectedPolygons, setSelectedPolygons] = useState(new Set());
  const { t } = useTranslation();
  const aboundaryTranslation = t('aboundary');
  const commonTranslation = t('common');
  const appTranslation = t('app');

  const loadSavedPolygons = () => {
    try {
      console.log('=== LOADING POLYGONS DEBUG ===');
      console.log('Profile:', profile);
      console.log('Profile ID:', profile?.id);
      console.log('Profile _id:', profile?._id);
      const userId = profile?._id?.toString() || profile?.id;
      console.log('Using userId to filter:', userId);
      
      // Get all polygons first
      const allPolygons = VasernDB.SavedPolygons.data();
      console.log('Total polygons in DB:', allPolygons.length);
      console.log('All polygon userIds:', allPolygons.map(p => p.userId));
      
      // Filter by userId
      const polygons = VasernDB.SavedPolygons.filter(
        p => p.userId === userId,
      ).data();
      
      console.log('Polygons for current user:', polygons.length);
      console.log('User polygons:', polygons.map(p => ({ name: p.polygonName, userId: p.userId })));
      
      // Sort by creation time (newest first)
      const sortedPolygons = polygons.sort((a, b) => b.createdAt - a.createdAt);
      setSavedPolygons(sortedPolygons);
      
      console.log('Setting state with polygons:', sortedPolygons.length);
    } catch (error) {
      console.error('❌ Error loading saved polygons:', error);
      console.error('Error stack:', error.stack);
    }
  };

  // Auto-reload polygons when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Small delay to ensure Vasern has persisted data
      const timer = setTimeout(() => {
        loadSavedPolygons();
      }, 100);
      
      return () => clearTimeout(timer);
    }, [profile])
  );

  const deletePolygon = (polygonId, polygonName) => {
    Alert.alert(
      appTranslation.delete_polygon,
      `${appTranslation.are_you_sure_delete} ${polygonName}?`,
      [
        { text: commonTranslation.cancel, style: 'cancel' },
        {
          text: commonTranslation.ok,
          style: 'destructive',
          onPress: () => {
            try {
              VasernDB.SavedPolygons.remove(polygonId);
              
              // Remove from selected polygons if it was selected
              if (selectedPolygons.has(polygonId)) {
                const newSelection = new Set(selectedPolygons);
                newSelection.delete(polygonId);
                setSelectedPolygons(newSelection);
              }
              
              // Immediately update UI by removing from state
              setSavedPolygons(prevPolygons => 
                prevPolygons.filter(p => p.id !== polygonId)
              );
              
              ToastAndroid.show(appTranslation.polygon_deleted, ToastAndroid.SHORT);
            } catch (error) {
              console.error('Error deleting polygon:', error);
            }
          },
        },
      ],
    );
  };

  const toggleSelection = (polygonId) => {
    const newSelection = new Set(selectedPolygons);
    if (newSelection.has(polygonId)) {
      newSelection.delete(polygonId);
    } else {
      newSelection.add(polygonId);
    }
    setSelectedPolygons(newSelection);
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const generateMapsForSelected = () => {
    if (selectedPolygons.size === 0) {
      ToastAndroid.show(appTranslation.select_at_least_one_polygon, ToastAndroid.SHORT);
      return;
    }

    const selectedPolygonData = savedPolygons.filter(p => selectedPolygons.has(p.id));
    
    // Navigate to DownloadPDF with selected polygons
    navigation.navigate('DownloadPDF', {
      selectedPolygons: selectedPolygonData.map(p => ({
        id: p.id,
        name: p.polygonName,
        coordinates: JSON.parse(p.coordinates),
      })),
    });
  };

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{appTranslation.saved_polygons}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={loadSavedPolygons} style={styles.headerButton}>
              <MaterialCommunityIcons name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('APCFRMarkBoundry')}
              style={styles.headerButton}
            >
              <MaterialCommunityIcons name="plus-circle" size={26} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="information" size={20} color="#2196F3" />
          <Text style={styles.infoText}>
            {appTranslation.select_polygons_to_generate}
          </Text>
        </View>

        {/* Polygons List */}
        {savedPolygons.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="map-marker-off" size={64} color="#888" />
            <Text style={styles.emptyText}>{appTranslation.no_saved_polygons}</Text>
            <Text style={styles.emptySubtext}>
              {appTranslation.trace_boundaries_to_save}
            </Text>
          </View>
        ) : (
          savedPolygons.map((polygon) => (
            <View key={polygon.id} style={styles.polygonCard}>
              {/* Selection Checkbox */}
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleSelection(polygon.id)}
              >
                <MaterialCommunityIcons
                  name={selectedPolygons.has(polygon.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={28}
                  color={selectedPolygons.has(polygon.id) ? '#4CAF50' : '#888'}
                />
              </TouchableOpacity>

              {/* Polygon Info */}
              <View style={styles.polygonInfo}>
                <View style={styles.polygonHeader}>
                  <Text style={styles.polygonName}>{polygon.polygonName}</Text>
                </View>

                <View style={styles.polygonDetails}>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>
                      {formatDateTime(polygon.startTime)}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="timer-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>
                      {appTranslation.duration}: {formatDuration(polygon.duration)}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#999" />
                    <Text style={styles.detailText}>
                      {appTranslation.points}: {polygon.pointsRecorded}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => deletePolygon(polygon.id, polygon.polygonName)}
                >
                  <MaterialCommunityIcons name="delete" size={24} color="#f44336" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Spacing for bottom button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Button */}
      {savedPolygons.length > 0 && (
        <View style={styles.bottomActions}>
          <CustomButton
            onPress={generateMapsForSelected}
            button={styles.generateButton}
            disabled={selectedPolygons.size === 0}
          >
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="map-check" size={24} color="#fff" />
              <Text style={styles.buttonText}>
                {appTranslation.generate_maps} ({selectedPolygons.size})
              </Text>
            </View>
          </CustomButton>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    color: '#fff',
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  polygonCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  checkbox: {
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  polygonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  polygonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  polygonName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  polygonDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#fff',
    marginLeft: 6,
  },
  actions: {
    justifyContent: 'space-around',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  generateButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#4CAF50',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SavedPolygonsScreen;
