import React from 'react';
import { Flex, Modal, Button,Text } from 'components/uikit'
import { Box } from 'theme-ui'
import { getColor } from 'views/LHD/utils/getColor';



function Bar(data : any) {
    const { property, color, value: originalValue = 0 } = data;
    const value = Math.floor((originalValue || 0) * 100);

    const Styles = {
        container: {
          backgroundColor: "white",
          width: '52%',
          height:'16px',
          borderRadius:20,
          m:'0 1%',
          border:"3px solid white",
        },
        insideBar:{
            borderRadius:20,
            width: value <= 2 ? "2%" : `${value}%`,
            backgroundColor: getColor(value),
        }
      };

  
  return (
    <Flex sx={{
        justifyContent:'end',
        alignItems:'center',
      }}>
         <Text sx={{
            fontWeight: 800,
            width:'35%',
            textAlign:'right',
            fontSize: ['.96em'],
            color:color,
            margin:  '0 1% 0 0',
          }}>
            {property} 
        </Text> 
        <Flex sx={Styles.container}>
        <Box sx={Styles.insideBar}/>
        </Flex>
         <Text sx={{
        fontWeight: 700,
        width:'10%',
        textAlign:'right',
        fontSize: ['.96em'],
        // margin:  '0 0 0 1%',
        minWidth: '25px',
        color:color,
        // background:'rgba(255,250,250,0.1)',
      }}>
          {value}%
        </Text> 
    </Flex>
  );
}


export default Bar;
