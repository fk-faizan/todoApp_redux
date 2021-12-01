import { Routes, Route } from 'react-router-dom';


import ScrollToTop from '../components/ScrollToTop';
import { PageNotFound } from '../components/error';

// redux + localstorage todo complete
import { List, Todos } from '../views';

const AppRouter = () => (
    <>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<List />}>
                <Route path=":listid" element={<Todos />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </>
);

export default AppRouter;
