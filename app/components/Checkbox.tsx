"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useAppContext } from '../Context';




// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  const {isVendor} = useAppContext();
  const color = isVendor ? '#6D6E8F' :'#FFFFFF';
  const border_color = !isVendor ? '#695DFD' :'#FFFFFF';
  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 30,
    height: 30,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: color,
    border: `3px solid ${border_color}`,
    // backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
      border: `2px solid transparent`,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
      ...theme.applyStyles('dark', {
        backgroundColor: '#30404d',
      }),
      border: `2px solid transparent`,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
      ...theme.applyStyles('dark', {
        background: 'rgba(57,75,89,.5)',
      }),
    },
    ...theme.applyStyles('dark', {
      boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
      backgroundColor: '#394b59',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
    }),
  }));
  
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#695DFD',
    border: `0px solid transparent`,
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
      display: 'block',
      width: 30,
      height: 30,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });
  
  return (
    <Checkbox
      sx={{ '&:hover': { bgcolor: 'transparent' } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

export default function CustomizedCheckbox({checked}:{checked:boolean}) {
  

  return (
    <div>
      <BpCheckbox checked={checked} />
      {/* <BpCheckbox defaultChecked />
      <BpCheckbox disabled /> */}
    </div>
  );
}