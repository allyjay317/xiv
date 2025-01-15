import { SiteProvider } from "../SiteContext"
import { Navigator } from '../NavigationRow/Navigator';
import { SideBar } from "./Sidebar";
import { PageContent } from "./PageContent";


export function Page(){
    return <div style={{height: '100%', margin: 0, padding: 0, width: '100%'}}>
        <SiteProvider>
            <Navigator />
            <div style={{display: 'flex'}}>
                <SideBar />
                <PageContent />
            </div>
        </SiteProvider>
    </div>
}