import { imageDetailState } from 'pages/Home';
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import './ImageDetails.scss';
import Image from 'types/image';

const ImageDetails = () => {
  const { imageId } = useParams<any>();
  const image = useRecoilValue<Image>(imageDetailState(imageId));

  return (
    <AnimatePresence exitBeforeEnter>
    <div className="image-details mx-4">
      <img 
        src={image.urls.regular}
        className="object-cover z-10 relative"
        width="400"
        alt={image.alt_description}
      />
      <div 
        className="image-info bg-white px-4 py-3 z-0"
      >
        <div className="flex flex-row w-full items-center mb-5">
          <img 
            src={image.user.profile_image.small}
            className="rounded-full mr-4"
            alt="" 
          />
          <div className="flex flex-col text-gray-700">
            <b>{image.user.name}</b>
            <small>{image.user.username}</small>
          </div>
          <i className="ml-auto self-start">
            <small className="text-gray-600">{format(new Date(image.created_at), 'dd/MM/yyyy')}</small>
          </i>
        </div>
        <span>{image.description}</span>
        <div className="flex justify-between flex-row my-5">
          <b className="text-red-300 block">{image.likes} Likes</b>
        </div>
      </div>
    </div>
    </AnimatePresence>
  );
};

export default ImageDetails;