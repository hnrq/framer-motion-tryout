import { imageDetailState } from 'pages/Home';
import { useRecoilValue } from 'recoil';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import './ImageDetails.scss';

const ImageDetails = () => {
  const { imageId } = useParams<any>();
  const image = useRecoilValue(imageDetailState(imageId));

  return (
    <div className="bg-white image-details mx-4">
      <img 
        src={image.urls.regular}
        className="object-cover"
        width="400"
        alt={image.alt_description}
      />
      <div className="image-info px-4 py-3">
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
            <small className="text-gray-600">{format(new Date(image.created_at), 'dd/MM/yyyy HH:mm:ss')}</small>
          </i>
        </div>
        <span>{image.description}</span>
        <div className="flex justify-between flex-row my-5">
          <b className="text-red-300 block">{image.likes} Likes</b>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;