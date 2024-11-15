import React, { useEffect, useState } from 'react';

import Alert from '@/assets/icons/AlertClear.png';
import Tint from '@/assets/BlueTint.png';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import alert from '@/assets/icons/alertWhite.png';
import { db } from '../Local_DB/db';
import { useAppContext } from '../Context';

const TyreFrame = ({ Content, setisSelected, photo, link, setCondition }: { setCondition: React.Dispatch<React.SetStateAction<string>>,Content: string; setisSelected: React.Dispatch<React.SetStateAction<boolean>>; photo: any; link: string }) => {
    let uploaded_photo = photo;
    const [checked, setChecked] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [isGood, setIsGood] = useState(false);
    const [isAverage, setIsAverage] = useState(false);
    const [isWorn, setIsWorn] = useState(false);
    const [isNeedNew, setIsNeedNew] = useState(false);
    const { isVendor } = useAppContext();

    const color = !isVendor ? '#695DFD' :'#FFFFFF'
    const sx = {
        color: color,
    '&.Mui-checked': {
        color: '#695DFD',
    },
    };

    const handleTyreCondition = (condition: string) => {
        switch (condition) {
            case 'new':
                setIsNew(true);
                setIsGood(false);
                setIsAverage(false);
                setIsWorn(false);
                setIsNeedNew(false);
                setCondition('new');
                break;
            case 'good':
                setIsNew(false);
                setIsGood(true);
                setIsAverage(false);
                setIsWorn(false);
                setIsNeedNew(false);
                setCondition('good');
                break;
            case 'average':
                setIsNew(false);
                setIsGood(false);
                setIsAverage(true);
                setIsWorn(false);
                setIsNeedNew(false);
                setCondition('average');
                break;
            case 'worn':
                setIsNew(false);
                setIsGood(false);
                setIsAverage(false);
                setIsWorn(true);
                setIsNeedNew(false);
                setCondition('worn');
                break;
            case 'needed':
                setIsNew(false);
                setIsGood(false);
                setIsAverage(false);
                setIsWorn(false);
                setIsNeedNew(true);
                setCondition('needed');
                break;
            default:
                break;
        }
    };

    useEffect(()=>{

    },[isNew,isGood,isAverage,isWorn,isNeedNew])

    useEffect(() => {
        setisSelected(checked);
    }, [checked]);

    return (
        <div className={`${isVendor ? 'bg-primaryDark' : 'bg-secondary '} flex justify-center  w-full `}>
            <div className='w-[90vw] border border-1 border-[#6D6E8F] rounded-lg overflow-hidden '>
                <div className='relative'>
                    {checked && <img src={Tint.src} className='absolute w-full h-full' />}
                    <img src={uploaded_photo} className='w-full object-cover'/>
                </div>
                <div className={`py-4 px-5 text-[18px]   ${isVendor ? 'bg-[#6D6E8F] border-t-2' : 'border border-1 border-[#D1D9FF]'}`}>
                    <div className='flex justify-between'>
                        <div className='space-y-1'>
                            <div className='font-[400]'>{Content}</div>
                            <div className={`text-[12px] flex space-x-1  ${isVendor ? 'text-white' : '  text-fourth'}`}>
                                <div><img src={isVendor ? alert.src : Alert.src} /></div>
                                <div>Select this tyre if damaged</div>
                            </div>
                        </div> 
                        <div className='pt-1'>
                            <div className={`${isVendor && 'form-group-white'}  mt-2`}>
                                <Checkbox
                                    {...label}
                                    
                                    size='large'
                                    sx={sx}
                                    onClick={()=>{setChecked(!checked)}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`${!isVendor && 'hidden'}`}>
                    <div className='flex justify-between pt-4'>
                        <div className='space-y-1'>
                            <div className='font-[400] pt-5'>New Tyres</div>
                        </div>
                        <div className='pt-1'>
                            <div className={`${isVendor && '-white'}  mt-2`}>
                                <Checkbox
                                    {...label}
                                    checked={isNew}
                                    size='large'
                                    sx={sx}
                                    onClick={() => { handleTyreCondition('new') }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between '>
                        <div className='space-y-1'>
                            <div className='font-[400] pt-5'>Good Tyres</div>
                        </div>
                        <div className='pt-1'>
                            <div className={`${isVendor && '-white'}  mt-2`}>
                                <Checkbox
                                    {...label}
                                    checked={isGood}
                                    size='large'
                                    sx={sx}
                                    onClick={() => { handleTyreCondition('good') }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between '>
                        <div className='space-y-1'>
                            <div className='font-[400] pt-5'>Average</div>
                        </div>
                        <div className='pt-1'>
                            <div className={`${isVendor && 'form-group-white'}  mt-2`}>
                                <Checkbox
                                    {...label}
                                    checked={isAverage}
                                    size='large'
                                    sx={sx}
                                    onClick={() => { handleTyreCondition('average') }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between '>
                        <div className='space-y-1'>
                            <div className='font-[400] pt-5'>Worn</div>
                        </div>
                        <div className='pt-1'>
                            <div className={`${isVendor && '-white'}  mt-2`}>
                                <Checkbox
                                    {...label}
                                    checked={isWorn}
                                    size='large'
                                    sx={sx}
                                    onClick={() => { handleTyreCondition('worn') }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between '>
                        <div className='space-y-1'>
                            <div className='font-[400] pt-5'>New Tyres Needed</div>
                        </div>
                        <div className='pt-1'>
                            <div className={`${isVendor && '-white'}  mt-2`}>
                                <Checkbox
                                    {...label}
                                    checked={isNeedNew}
                                    size='large'
                                    sx={sx}
                                    onClick={() => { handleTyreCondition('needed') }}
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TyreFrame;