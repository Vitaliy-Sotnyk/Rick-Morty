import { useState } from 'react';

function ColorSelector({ colorChangeElement, setColorChangeElemen }) {
    const [colorStatusElement, setColorStatusElement] = useState('coming-sun');
    const [colorStatusTeleport, setColorStatusTeleport] = useState(false);


    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const handleClick = async (status) => {
        setColorStatusTeleport(true)
        setColorStatusElement('');
        delay(1000).then(() => {
            setColorStatusElement(`coming-${status}`)
        });
        delay(1000).then(() => {
            setColorStatusTeleport(false);
        });
    };

    return (
        <section className='section-color-selector'>
            <img className={`section-color-selector__teleport${colorStatusTeleport ? '': '-hidden'}`}
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fc4e765d-760d-45dc-9f31-58d1bd0eb872/dc4z89w-641684e2-15ca-497b-b5ca-c331e7e055b6.png/v1/fill/w_1024,h_1024/rick_and_morty_portal_1___free_download_by_loaf_of_muffin_dc4z89w-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2ZjNGU3NjVkLTc2MGQtNDVkYy05ZjMxLTU4ZDFiZDBlYjg3MlwvZGM0ejg5dy02NDE2ODRlMi0xNWNhLTQ5N2ItYjVjYS1jMzMxZTdlMDU1YjYucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5PeSWIoX1cFhDXi8nbPstLGpqjyYC0D9r5rBPrjKbh0" alt="Teleport" />
            <div className={`section-color-selector__sun ${colorStatusElement === 'coming-sun' ? colorStatusElement : ''}`}
                onClick={e => {
                    setColorChangeElemen(e = !colorChangeElement)
                    handleClick('moon')
                }}>
                <img src="https://static.wikia.nocookie.net/multiversus/images/2/27/ROThumb_SunScream.png" alt="SunScream" />
            </div>
            <div className={`section-color-selector__moon ${colorStatusElement === 'coming-moon' ? colorStatusElement : ''}`}
                onClick={e => {
                    setColorChangeElemen(e = !colorChangeElement)
                    handleClick('sun')
                }}>
                <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e12cd74a-d301-4d23-9d52-81298e3ae2be/dfhbhfs-d90c862d-0fae-4a23-bf40-62feda707e97.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UxMmNkNzRhLWQzMDEtNGQyMy05ZDUyLTgxMjk4ZTNhZTJiZVwvZGZoYmhmcy1kOTBjODYyZC0wZmFlLTRhMjMtYmY0MC02MmZlZGE3MDdlOTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-Dq13_76dM75UpyHykYFleRAg2iJyYDUioj1_wVrjDM" alt="Moon" />
            </div>
        </section>
    );
}

export default ColorSelector;
