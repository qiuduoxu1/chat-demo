'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
import '../ui/dashboard/left.css'
import store from '../ui/reducer/store';
import { Provider } from 'react-redux';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <div className="total">
                <SideNav />
                {children}
            </div>

        </Provider>
    );
}