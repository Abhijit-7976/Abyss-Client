import {
  updateAllCameras,
  updateAllMics,
  updateCamera,
  updateMic,
} from "@/features/settings/userGeneralSettings";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useUserMedia = () => {
  // const [devices, setDevices] = useState<{
  //   camera: MediaDeviceInfo[];
  //   mic: MediaDeviceInfo[];
  //   speaker: MediaDeviceInfo[];
  // }>({ camera: [], mic: [], speaker: [] });

  const generalSettings = useSelector(
    (state: RootState) => state.generalSettings
  );

  const {
    media: { camera: localCameraId, mic: localMicId },
  } = generalSettings;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      console.log("useUserMedia hook effect");
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      let localCameraPresent = false;
      let localMicPresent = false;

      const cameraDevices = deviceInfos.filter(device => {
        if (device.kind === "videoinput") {
          if (device.deviceId === localCameraId) localCameraPresent = true;
          return device.deviceId;
        }
      });
      const micDevices = deviceInfos.filter(device => {
        if (device.kind === "audioinput") {
          if (device.deviceId === localMicId) localMicPresent = true;
          return device.deviceId;
        }
      });
      // const speakerDevices = deviceInfos.filter(
      //   device => device.kind === "audiooutput" && device.deviceId
      // );
      // setDevices({
      //   camera: cameraDevices,
      //   mic: micDevices,
      //   speaker: speakerDevices,
      // });

      if (!localCameraPresent && cameraDevices.length > 0) {
        dispatch(updateCamera(cameraDevices[0].deviceId));
      }
      if (!localMicPresent && micDevices.length > 0) {
        dispatch(updateMic(micDevices[0].deviceId));
      }

      if (cameraDevices.length > 0) {
        dispatch(updateAllCameras(cameraDevices));
      }

      if (micDevices.length > 0) {
        dispatch(updateAllMics(micDevices));
      }
    })();
  }, [dispatch, localCameraId, localMicId]);
};

export default useUserMedia;
