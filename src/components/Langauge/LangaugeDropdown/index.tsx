import { Select, SelectItem, Text } from 'components/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'

const LanguageDropwdown = () => {
  const { currentLanguage, setLanguage } = useTranslation()
  return (
    <Select
      active={currentLanguage.language}
      position="top"
      onChange={(e) => setLanguage(languageList.find((lang) => lang.language === e.target.value) || languageList[0])}
    >
      {languageList.map((lang) => {
        const { code, language } = lang
        return (
          <SelectItem key={code} value={language} size="xsm">
            <Text>{language}</Text>
          </SelectItem>
        )
      })}
    </Select>
  )
}

export default LanguageDropwdown
