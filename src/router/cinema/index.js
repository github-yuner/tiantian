export default {
    path: '/cinema',
    component: () => import('@/views/Cinema'),
    children: [
        {
            path: 'cListCity',
            component: () => import('@/components/CListCity')
        },
        {
            path: 'cListBrand',
            component: () => import('@/components/CListBrand')
        },
        {
            path: 'cListCharacter',
            component: () => import('@/components/CListCharacter')
        },
        {
            path: '/cinema',
            redirect:'/cinema/cListCity'
        }
    ]
}