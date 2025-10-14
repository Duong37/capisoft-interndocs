import { SafeArea } from 'capacitor-plugin-safe-area';

SafeArea.getSafeAreaInsets().then(({ insets }) => {
  console.log(insets);
});

SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
  console.log(statusBarHeight, 'statusbarHeight');
});

await SafeArea.removeAllListeners();

// when safe-area changed
await SafeArea.addListener('safeAreaChanged', data => {
  const { insets } = data;
  for (const [key, value] of Object.entries(insets)) {
    document.documentElement.style.setProperty(
      `--safe-area-inset-${key}`,
      `${value}px`,
    );
  }
});

// with tailwindcss
import {useEffect} from 'react';
import { SafeArea } from 'capacitor-plugin-safe-area';

import type {FC} from 'react';

const App = () => {
    useEffect(() => {
        (async function(){
            const safeAreaData = await SafeArea.getSafeAreaInsets();
            const {insets} = safeAreaData;
            for (const [key, value] of Object.entries(insets)) {
                document.documentElement.style.setProperty(
                    `--safe-area-inset-${key}`,
                    `${value}px`,
                );
            }
        })()
    }, []);
    return (
        <div className="pb-safe toolbar">
            <div>....</div>
        </div>
    )
}
export default App;



