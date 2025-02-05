import { useNavigate } from 'react-router'
import { Button } from '../../common/Button'
import { MenuButton } from '../../common/MenuButton'
import { useSiteContext } from '../../context/useSiteContext'

export function LoginButton({ loginURI }: { loginURI: string }) {
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
        },
        { label: 'Logout', onClick: logOut },
      ]}
      direction="down"
      config={{
        type: 'img',
        img: `https://cdn.discordapp.com/avatars/${userInfo.discord_id}/${userInfo.avatar}`,
        color: userInfo.accent_color,
      }}
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
