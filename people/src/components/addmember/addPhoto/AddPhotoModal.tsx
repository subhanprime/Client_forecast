import React, { useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import { useDebounceEffect } from '../../../utils/useDebounceEffect';
import { canvasPreview } from '../../../utils/canvasPreview';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

function AddPhotoModal() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<any>();
  // const [loading, setLoading] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const blobUrlRef = useRef('');
  const aspect = 16 / 9;
  const scale = 1;
  const rotate = 0;
  const [completedCrop, setCompletedCrop] = useState<any>();
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [filePreview, setFilePreview] = useState< string | undefined>();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const onPhotoModalClose = () => {
    setIsPhotoModalOpen(!isPhotoModalOpen);
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width
        && completedCrop?.height
        && imgRef.current
        && previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen:any = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx:any = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);
  }

  const handleFileClick = () => {
    document.getElementById('fileInput')?.click();
  };
  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file input change here if needed
    const file:any = event.target.files?.[0];
    const imageUrl = URL.createObjectURL(file);
    // setSelectedFile(file);
    setFilePreview(imageUrl);
    setIsPhotoModalOpen(true);
  };

  const onSaveClick = () => {
    onDownloadCropClick();
    setSaved(true);
    setIsPhotoModalOpen(false);
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  return (
    <div>
      {blobUrlRef.current !== '' && saved ? (
        <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={blobUrlRef.current} alt="fdsfd" />
        </div>
      ) : (
        <div>
          <div
            className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100
              text-indigo-700 font-semibold text-2xl hover:bg-gray-500 cursor-pointer relative"
            onClick={handleFileClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-full text-center text-white text-xs">Add Photo</span>
              </div>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      )}
      {/* Main modal */}
      {isPhotoModalOpen && (
        <div
          id="default-modal"
          aria-hidden="true"
          className={`${
            isPhotoModalOpen ? 'fixed flex' : 'hidden'
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-[100] justify-center items-start w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-white/40 `}
        >
          <div className="relative bg-white rounded-lg w-[550px] shadow-2xl  mt-9 flex flex-col px-4">

            <div className="flex items-center justify-between px-6 pt-4   rounded-t mb-4">
              <h3 className="text-3xl font-semibold text-gray-900 dark:text-white py-2">
                Update profile photo
              </h3>
            </div>
            <div className="">
              {!!filePreview && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop:any) => setCrop(percentCrop)}
                  onComplete={(c:any) => setCompletedCrop(c)}
                  aspect={aspect}
                  // minWidth={400}
                  minHeight={100}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={filePreview}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
              {!!completedCrop && (
                <div className="">
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: '1px solid black',
                      objectFit: 'contain',
                      width: completedCrop.width,
                      height: completedCrop.height,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-5 mb-4 items-center w-full justify-center">
              <button type="button" className="bg-blue-500 text-neutral-100 px-2 h-10 rounded-md text-sm" onClick={onSaveClick}>Save</button>
              <button type="button" onClick={onPhotoModalClose} className="bg-gray-300 text-black px-2 h-10 rounded-md text-sm">Cancel</button>
            </div>

          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default AddPhotoModal;
