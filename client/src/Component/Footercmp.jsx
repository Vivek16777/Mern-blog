import React from 'react'
import { Footer,FooterTitle,FooterLink,FooterLinkGroup,FooterDivider, FooterCopyright, FooterIcon } from 'flowbite-react'
import {BsInstagram,BsLinkedin,BsGithub,BsTwitter} from 'react-icons/bs'
import { Link } from 'react-router-dom'
export default function Footercmp() {
  return (
      <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
          <Link to='/' className='self-center whitespace-nowrap text-lg font-bold dark:text-white sm:text-xl'>
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Note's</span>
        <span className="ml-2 text-lg font-semibold dark:text-white">Circle</span>
        </Link>
        </div>
          <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6 mb-5">
            <div className="">
            <FooterTitle title='ABOUT'/>
            <FooterLinkGroup col>
              <FooterLink
              href='https://www.100jsprojects.com'
              target='_blank'
              rel='noopener noreferrer'>
                100 js projects
              </FooterLink>
              <FooterLink
              href='/About'
              target='_blank'
              rel='noopener noreferrer'>
                Note's Circle
              </FooterLink>
            </FooterLinkGroup>
            </div>
            <div className="">
            <FooterTitle title='FOLLOW US'/>
            <FooterLinkGroup col>
              <FooterLink
              href='https://github.com/Vivek16777/'
              target='_blank'
              rel='noopener noreferrer'>
                Github
              </FooterLink>
              <FooterLink
              href='https://www.linkedin.com/in/vivek-kumar-7ba30a28b/'
              target='_blank'
              rel='noopener noreferrer'>
                Linkedin
              </FooterLink>
            </FooterLinkGroup>
            </div>
            <div className="">
            <FooterTitle title='LEGAL'/>
            <FooterLinkGroup col>
              <FooterLink
              href='#'
              target='_blank'
              rel='noopener noreferrer'>
                Privacy policy
              </FooterLink>
              <FooterLink
              href='#'
              target='_blank'
              rel='noopener noreferrer'>
                Terms & Conditions
              </FooterLink>
            </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider/>
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href='#' by="Note's Circle" year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm:mt-0 mt-4 mb-4 sm:justify-center">
            <FooterIcon href='#' icon={BsInstagram}/> 
            <FooterIcon href='#' icon={BsTwitter}/> 
            <FooterIcon href='#' icon={BsLinkedin}/> 
            <FooterIcon href='#' icon={BsGithub}/> 
            </div>
          </div>
        </div>
      </Footer>
  )
}
