import { onThemeChange, onShowCustomThemeView, onThemeInt } from './theme';
import { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } from './popular'
import { onRefreshTrending, onLoadMoreTrending, onFlushTrendingFavorite } from './trending'
import { onLoadLanguage } from './language'
import { onLoadFavoriteData } from './favorite'


export default {
    onThemeChange,
    onShowCustomThemeView,
    onThemeInt,
    onRefreshPopular,
    onLoadMorePopular,
    onFlushPopularFavorite,
    onRefreshTrending,
    onLoadMoreTrending,
    onFlushTrendingFavorite,
    onLoadLanguage,
    onLoadFavoriteData
}