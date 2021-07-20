export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            // 详情页属于动态路由 
            // 命名视图的路由写法
            path: 'detail/1/:movieId',
            components: {
                default: () => import('@/components/NowPlaying'),
                // 引入路由对应的组件 这里的detail和router-view的name是一样的 当页面切换到detail的时候，这个页面只会渲染到name对应的那个位置
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            // 详情页属于动态路由 
            // 命名视图的路由写法
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                // 引入路由对应的组件 这里的detail和router-view的name是一样的 当页面切换到detail的时候，这个页面只会渲染到name对应的那个位置
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            // 详情页属于动态路由 
            // 命名视图的路由写法
            path: 'detail/3/:movieId',
            components: {
                default: () => import('@/components/Search'),
                // 引入路由对应的组件 这里的detail和router-view的name是一样的 当页面切换到detail的时候，这个页面只会渲染到name对应的那个位置
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }

    ]
    
}