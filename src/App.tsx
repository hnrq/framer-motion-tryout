import { lazy, Suspense } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Modal } from 'components/Modal';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { CubeSpinner } from 'react-spinners-kit';
import { Home } from 'pages/Home';
import './App.css';

const ImageDetails = lazy(() => import('pages/ImageDetails/ImageDetails'));

const App = () => (
  <RecoilRoot>
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Route path="/" component={Home} key="home"/>
        <Route path="/image/:imageId" key="modal">
          <Modal>
            <Suspense fallback={(
              <div className="mx-auto flex p-4 w-full justify-center">
                <CubeSpinner />
              </div>
            )}>
              <ImageDetails />
            </Suspense>
          </Modal>
        </Route>
      </AnimatePresence>
    </BrowserRouter>
  </RecoilRoot>
);


export default App;
