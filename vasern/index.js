import Vasern from 'vasern';
import {Queryable} from 'vasern';

const VasernDB = new Vasern({
  schemas: [
    {
      name: 'ClaimImages',
      props: {
        name: 'string',
        base64Data: 'string',
        claimId: 'string',
        userId: 'string',
        extraImageID: '?string',
        shouldTriggerJointVerification: 'booolean',
        IS_IFR_CLAIM: '?boolean',
      },
    },
    {
      name: 'ClaimImagesIFR',
      props: {
        name: 'string',
        base64Data: 'string',
        claimId: 'string',
        userId: 'string',
        extraImageID: '?string',
        shouldTriggerJointVerification: 'booolean',
        IS_IFR_CLAIM: '?boolean',
      },
    },
    {
      name: 'IFRBoundaries',
      props: {
        userPath: '[]',
        claimId: 'string',
        // userId: 'string',
        // ScreenshotBase64Data: 'string',
      },
    },
    {
      name: 'SavedPolygons',
      props: {
        userId: 'string',
        polygonName: 'string', // e.g., "Polygon-1"
        coordinates: '[]', // Array of {latitude, longitude}
        startTime: 'string', // ISO timestamp
        endTime: 'string', // ISO timestamp
        duration: 'number', // in seconds
        pointsRecorded: 'number',
        isVisible: 'boolean', // for view/hide toggle
        createdAt: 'number', // timestamp for sorting
      },
    },
  ],
});

VasernDB.ClaimImages.onChange(({changed, event}) => {
  console.log(changed);
});

export {VasernDB};
