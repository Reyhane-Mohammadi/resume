import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--f-display', weight: ['600', '800'] });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--f-body' });

const INIT = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata = {
  title: 'Reyhaneh Mohammadi · Backend & AI Developer',
  description: 'Junior backend developer and M.Sc. AI student. Python, Django, FastAPI, reinforcement learning.',
};

export const viewport = { themeColor: '#12102B' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: INIT }} /></head>
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
