import React, { FC } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import Image from 'types/image';
import './ImagePreview.scss';

interface ImagePreviewProps {
  image: Image
};

const ImagePreview: FC<ImagePreviewProps> = ({ image }) => (
  <AnimatePresence>
    <Link to={`/image/${image.id}`}>
      <motion.img 
        src={image.urls.small} 
        alt={image.alt_description} 
        className="m-4 image flex justify-center cursor-pointer"
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0 }}
        transition={{ ease: 'easeInOut' }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.97 }}
      />
    </Link>
  </AnimatePresence>
);

export default ImagePreview;