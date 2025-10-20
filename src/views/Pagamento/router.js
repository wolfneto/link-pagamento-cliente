import Varejo from './Varejo';
import Academico from './Academico';

export default [{
    path: '/:codigo',
    name: 'Pagamentos',
    props: true,
    component: Varejo,
}, {
    path: '/academico/:codigo',
    name: 'Academicos',
    props: true,
    component: Academico,
}]