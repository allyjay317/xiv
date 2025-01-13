export type UserInfo = {
    id: string
    username: string,
    global_name: string | null,
    display_name: string | null,
    avatar: string,
    avatar_decoration: string | null,
    discriminator: string,
    public_flags: number,
    flags: number,
    banner: string,
    banner_color: string,
    accent_color: number,
    locale: string,
    mfa_enabled: boolean,
    premium_type: number
}