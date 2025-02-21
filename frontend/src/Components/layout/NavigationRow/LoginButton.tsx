import { useNavigate } from 'react-router'
import { Button } from '../../common/Button'
import { MenuButton } from '../../common/MenuButton'
import { useSiteContext } from '../../context/useSiteContext'
import { Size } from '../../../utils/types'

export function LoginButton({
  loginURI,
  size,
}: {
  loginURI: string
  size: Size
}) {
  const { isLoggedIn, logOut, userInfo } = useSiteContext()
  const navigate = useNavigate()
  return isLoggedIn && userInfo ? (
    <MenuButton
      label="User"
      menuItems={[
        {
          label: 'Characters',
          onClick: () => {
            navigate('/user')
          },
          type: 'button',
        },
        { label: 'Logout', onClick: logOut, type: 'button' },
      ]}
      direction="down"
      config={{
        type: 'img',
        img: `https://cdn.discordapp.com/avatars/${userInfo.discord_id}/${userInfo.avatar}`,
        color: userInfo.accent_color,
      }}
      size={size}
    />
  ) : (
    <>
      <Button
        label="Login"
        onClick={() => {
          window.open(loginURI, '_self')
        }}
      />
    </>
  )
}
