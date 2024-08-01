import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

function AccordionComponent() {
  return (
    <Accordion allowMultiple border={"2px solid rgb(47, 47, 47)"} padding={"1rem"} width={"100%"} borderRadius={"5px"} marginBottom={"2rem"}>
      <AccordionItem marginBottom={"2rem"}> 
        <h2 >
          <AccordionButton
            background="transparent"
            border={"none"}
            padding={"1rem"}
            borderRadius={"8px"}
            color={"white"}
            borderBottom={"2px solid rgb(47, 47, 47)"}
            _expanded={{ bg: "rgb(60, 60, 60)" }}
          >
            <Box as='span' flex='1' textAlign='left'>
              <Box display={"flex"} gap={"1rem"}>
                <img
                  src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427191/Croma%20Assets/ZipCare_PROD/PlanLogo/Protect/ZipCare_AdvancedProtect_200x200px_6March2024_kn2e1m.png"
                  alt=""
                  width={"60px"}
                />
                <div>
                  <h3 className='accordian_heading_h2'>ZipCare Protect-Advanced</h3>
                  <p  className='accordian_heading_p'>Starting at just ₹106/month</p>
                </div>
              </Box>
            </Box>
            <AccordionIcon fontSize={"30px"} />
          </AccordionButton>
        </h2>
        <AccordionPanel padding={"0px 2rem"}>
          <div className='accordion_item_container'>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427564/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Extends_your_Device_s_Life_nlnnoo.png"
                alt=""
                width={"50px"}
              />
              <span>Extends your Devices Life</span>
            </div>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427574/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Protection_Against_Sudden_Malfunctions_v38p9c.png"
                alt=""
                width={"50px"}
              />
              <span>Protection against sudden malfunctions</span>
            </div>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427564/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Extends_your_Device_s_Life_nlnnoo.png"
                alt=""
                width={"50px"}
              />
              <span>Extends your Devices Life</span>
            </div>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427574/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Protection_Against_Sudden_Malfunctions_v38p9c.png"
                alt=""
                width={"50px"}
              />
              <span>Protection against sudden malfunctions</span>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton
             background="transparent"
            border={"none"}
            padding={"1rem"}
            borderRadius={"8px"}
            color={"white"}
            borderBottom={"2px solid rgb(60, 60, 60)"}
            _expanded={{ bg: "rgb(60, 60, 60)" }}
          >
            <Box as='span' flex='1' textAlign='left'>
              <Box display={"flex"} gap={"1rem"}>
                <img
                  src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427191/Croma%20Assets/ZipCare_PROD/PlanLogo/Protect/ZipCare_AdvancedProtect_200x200px_6March2024_kn2e1m.png"
                  alt=""
                  width={"60px"}
                />
                <div>
                <h3 className='accordian_heading_h2'>ZipCare Protect-Advanced</h3>
                <p  className='accordian_heading_p'>Starting at just ₹106/month</p>
                </div>
              </Box>
            </Box>
            <AccordionIcon fontSize={"30px"} />
          </AccordionButton>
        </h2>
        <AccordionPanel padding={"0px 2rem"}>
          <div className='accordion_item_container'>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427564/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Extends_your_Device_s_Life_nlnnoo.png"
                alt=""
                width={"50px"}
              />
              <span>Extends your Devices Life</span>
            </div>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427574/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Protection_Against_Sudden_Malfunctions_v38p9c.png"
                alt=""
                width={"50px"}
              />
              <span>Protection against sudden malfunctions</span>
            </div>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427564/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Extends_your_Device_s_Life_nlnnoo.png"
                alt=""
                width={"50px"}
              />
              <span>Extends your Devices Life</span>
            </div>
            <div className='accordian_item'>
              <img
                src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710427574/Croma%20Assets/ZipCare_PROD/HighlightIcons/protect/Protection_Against_Sudden_Malfunctions_v38p9c.png"
                alt=""
                width={"50px"}
              />
              <span>Protection against sudden malfunctions</span>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionComponent;
