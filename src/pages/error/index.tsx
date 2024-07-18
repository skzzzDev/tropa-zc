import { Header } from '../../components/header';
import './error.css';

export function Error() {
    return(
        <div>
            <Header />
            <div className='bg-neutral-800 min-h-screen flex flex-col items-center justify-center'>
                <div className='flex items-center space-x-4'>
                    <p className="text-white text-lg typing-animation">Página não encontrada</p>
                </div>
            </div>
        </div>
    );
}
