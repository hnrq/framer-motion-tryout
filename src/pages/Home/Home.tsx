import { useRef, useEffect, useState } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import './Home.scss';
import { 
  atom, 
  selectorFamily, 
  useRecoilState,
  useRecoilValueLoadable
} from 'recoil';
import { ImagePreview } from 'components/ImagePreview';
import { CubeSpinner } from 'react-spinners-kit';
import _ from 'lodash';
import api from 'api';
import useDebounce from 'hooks/useDebounce';
import { arrayToMap } from 'utils/array';

const pageState = atom({
  key: 'pageState',
  default: 1
});

const totalPagesState = atom({
  key: 'totalPagesState',
  default: 0
});

const picturesState = atom({
  key: 'picturesState',
  default: new Map()
});

const currentPicturePageState = selectorFamily({
  key: 'currentPicturePageState',
  get: (query: string) => async ({ get }) => {
    try {
      if(query.length > 2) {
        const { data } = await api.get('/search/photos', {
          params: { 
            page: get(pageState),
            query
          }
        });
        return { 
          images: arrayToMap(data.results, 'id'),
          totalPages: data.total_pages
        } || [];
      }
      return { images: [], totalPages: 0 };
    } catch (error) {
      throw error;
    }
  }
});

export const imageDetailState = selectorFamily({
  key: 'imageDetailState',
  get: (imageId: string) => async ({ get }) => {
    const image = get(picturesState).get(imageId);
    if (image) return image;
    else {
      const { data } = await api.get(`/photos/${imageId}`);
      return data;
    }
  }
});

const Home = () => {
  const [images, setImages] = useRecoilState(picturesState);
  const [page, setPage] = useRecoilState(pageState);
  const [totalPages, setTotalPages] = useRecoilState(totalPagesState);
  const [query, setQuery] = useState("Minimal");
  const debouncedQuery = useDebounce(query, 500);
  const picturePageLoadable = useRecoilValueLoadable(currentPicturePageState(debouncedQuery));
  const loader = useRef(null);
  
  useEffect(() => {
    if(query.length > 2) {
      setPage(1);
      setImages(new Map());
    }
  }, [query, setPage, setImages]);

  useEffect(() => {
    if(picturePageLoadable.state === 'hasValue') {
      setImages((images) => new Map([...images, ...picturePageLoadable.contents.images]) as any);
      setTotalPages(picturePageLoadable.contents.totalPages);
    }
  }, [picturePageLoadable, setImages, setTotalPages]);

  const onIntersect = () => {
    if (picturePageLoadable.state !== 'loading' && page !== totalPages) { 
      setPage((page) => page + 1);
    }
  };

  useIntersectionObserver(loader, onIntersect);

  return (
    <div className="home flex flex-col">
      <div className="pt-2 relative mx-auto text-gray-600 w-11/12 my-5">
        <input 
          type="text" 
          className="w-full box-border py-3 px-4 focus:outline-none rounded-md shadow-md"
          placeholder="Search for a term..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </div>
      <div className="pictures-container w-full flex flex-wrap flex-row align-center justify-center min-h-screen">
        {!_.isEmpty(images) && (
          Array.from(images).map(([key, image]) => <ImagePreview image={image} key={image.id} />
        ))}
        {picturePageLoadable.state === 'loading' && (
          <div className="mx-auto flex p-4 w-full justify-center">
            <CubeSpinner />
          </div>
        )}
      </div>
      <div
       className="w-full flex flex-wrap flex-row justify-center h-8" 
       ref={loader} 
      />
    </div>
  );
}

export default Home;