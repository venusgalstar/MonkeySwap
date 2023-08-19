import React, { useEffect, useRef, useState } from 'react'
import { Bar, Container, Indicator, StyledTabNavStats, Tab } from './styles'
import { Flex, Text } from 'components/uikit'

interface TabNavProps {
  activeTab: string
  tabOptions: string[]
  onChangeActiveTab: (tab: string) => void
  ownedBillsAmount?: number
}

export const TabNav: React.FC<TabNavProps> = ({ tabOptions, activeTab, onChangeActiveTab, ownedBillsAmount }) => {
  const [width, setWidth] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const refs = useRef([])

  const handleActiveTab = (el: HTMLDivElement, tab: string) => {
    setLeft(el.offsetLeft)
    setWidth(el.offsetWidth)

    onChangeActiveTab(tab)
  }

  useEffect(() => {
    const activeTabIndex = tabOptions.indexOf(activeTab)

    // Check if the activeTab provided exists in tabOptions
    if (activeTabIndex > -1) {
      //@ts-ignore
      setLeft(refs.current[activeTabIndex].offsetLeft)
      //@ts-ignore
      setWidth(refs.current[activeTabIndex].offsetWidth)
    } else {
      // Default to the first tab if the activeTab does not match any tabOption
      //@ts-ignore
      setLeft(refs.current[0].offsetLeft)
      //@ts-ignore
      setWidth(refs.current[0].offsetWidth)
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <>
      <Container>
        <StyledTabNavStats columns={tabOptions.length}>
          <Indicator style={{ left, width }} />
          {tabOptions.map((tab, index) => (
            <Tab
              key={tab}
              ref={(element: any) => {
                //@ts-ignore
                refs.current[index] = element
              }}
              onClick={() => tab !== 'Products' && handleActiveTab(refs.current[index], tab)}
              isActive={activeTab === tab}
              disabled={tab === 'Products'}
            >
              <Flex sx={{ alignItems: 'center' }}>
                {tab}
                {tab === 'Products' && (
                  <Flex
                    sx={{
                      background: 'yellow',
                      height: '16px',
                      padding: '0px 5px',
                      pt: '2px',
                      borderRadius: '5px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      ml: '5px',
                    }}
                  >
                    <Text size="10px" weight={700} color="primaryBright">
                      SOON!
                    </Text>
                  </Flex>
                )}
                {tab === 'Your Bonds' && ` (${ownedBillsAmount})`}
              </Flex>
            </Tab>
          ))}
        </StyledTabNavStats>
        <Bar />
      </Container>
    </>
  )
}
