import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { AppDispatch, RootState } from "@/store";
import { Label } from "@radix-ui/react-label";
import { Moon, Palette, Pause, Play, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCamera, updateMic, updateTheme } from "./userGeneralSettings";
// import speakerTest from "/speaker_test.mp3";

const GeneralSettings = () => {
  const [micTest, setMicTest] = useState(false);

  const cameraRef = useRef<HTMLVideoElement>(null);
  const micRef = useRef<HTMLAudioElement>(null);

  const generalSettings = useSelector(
    (state: RootState) => state.generalSettings
  );

  const {
    theme,
    media: { camera: localCameraId, mic: localMicId, allCameras, allMics },
  } = generalSettings;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: localCameraId } },
          audio: false,
        });

        if (cameraRef.current) {
          cameraRef.current.srcObject = cameraStream;
        }

        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: localMicId } },
          video: false,
        });

        if (micRef.current) {
          micRef.current.srcObject = micStream;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [localCameraId, localMicId]);

  const handleThemeChange = (theme: string) => {
    dispatch(updateTheme(theme));
  };

  const handleCameraChange = async (cameraId: string) => {
    dispatch(updateCamera(cameraId));
    try {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: cameraId } },
        audio: false,
      });

      if (cameraRef.current) {
        cameraRef.current.srcObject = cameraStream;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMicChange = async (micId: string) => {
    setMicTest(false);
    dispatch(updateMic(micId));
    try {
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: micId } },
        video: false,
      });

      if (micRef.current) {
        micRef.current.srcObject = micStream;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSpeakerChange = async (speakerId: string) => {
  //   speakerRef.current?.setSinkId(speakerId);
  // };

  return (
    <>
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="theme">Theme</Label>
          <Select
            onValueChange={handleThemeChange}
            defaultValue={theme}>
            <SelectTrigger
              id="theme"
              className="w-40">
              <SelectValue placeholder="Select desired theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">
                <span className="flex items-center gap-2">
                  <Palette className="size-4" /> System
                </span>
              </SelectItem>
              <SelectItem value="light">
                <span className="flex items-center gap-2">
                  <Sun className="size-4" /> Light
                </span>
              </SelectItem>
              <SelectItem
                value="dark"
                className="ml-0">
                <span className="flex items-center gap-2">
                  <Moon className="size-4" /> Dark
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="camera">Camera</Label>
          <Select
            onValueChange={handleCameraChange}
            value={localCameraId}>
            <SelectTrigger
              id="camera"
              className="w-3/4">
              <SelectValue placeholder="Select a camera" />
            </SelectTrigger>
            <SelectContent>
              {allCameras.length == 0 && (
                <p className="text-sm px-2">No device found</p>
              )}
              {allCameras.map(device => (
                <SelectItem
                  key={device.deviceId}
                  value={device.deviceId}>
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <video
              ref={cameraRef}
              autoPlay
              playsInline
              className="aspect-video object-cover rounded-sm bg-black w-full !mt-1.5"
            />
            {allCameras.length == 0 && (
              <p className="text-gray-300 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                No device found
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="mic">Microphone</Label>
          <div className="flex gap-2">
            <Select
              onValueChange={handleMicChange}
              value={localMicId}>
              <SelectTrigger
                id="mic"
                className="w-3/4">
                <SelectValue placeholder="Select a mic" />
              </SelectTrigger>
              <SelectContent>
                {allMics.length == 0 && (
                  <p className="text-sm px-2">No device found</p>
                )}
                {allMics.map(device => (
                  <SelectItem
                    key={device.deviceId}
                    value={device.deviceId}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <audio
              hidden
              ref={micRef}
              playsInline
            />

            <Toggle
              variant="outline"
              // className="flex gap-1"
              disabled={allMics.length == 0}
              onPressedChange={pressed => {
                setMicTest(pressed);
                if (pressed) micRef.current?.play();
                else micRef.current?.pause();
              }}>
              {!micTest ? (
                <Play className="size-4" />
              ) : (
                <Pause className="size-4" />
              )}
            </Toggle>
          </div>
        </div>

        {/* <div className="space-y-1">
          <Label htmlFor="mic">Speaker</Label>
          <div className="flex gap-2">
            <Select onValueChange={handleSpeakerChange}>
              <SelectTrigger
                id="speaker"
                className="w-3/4">
                <SelectValue placeholder="Select a speaker" />
              </SelectTrigger>
              <SelectContent>
                {devices.speaker.length == 0 && (
                  <p className="text-sm px-2">No device found</p>
                )}
                {devices.speaker.map(device => (
                  <SelectItem
                    key={device.deviceId}
                    value={device.deviceId}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <audio
              ref={speakerRef}
              src={speakerTest}
              loop
              className="aspect-video"
            />

            <Toggle
              variant="outline"
              onPressedChange={pressed => {
                if (pressed) speakerRef.current?.play();
                else speakerRef.current?.pause();
              }}>
              Test
            </Toggle>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default GeneralSettings;
