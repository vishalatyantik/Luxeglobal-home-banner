import "../scss/style.scss";

import Grid from './grid';
import { preloadImages } from './utils';

// Preload  images
preloadImages('.img img').then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');

    // Initialize grid
    const grid = new Grid(document.querySelector('.img_wrapper'));
});
