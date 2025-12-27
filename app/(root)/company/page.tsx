'use client'
import CompanyComponent, { WebsiteData } from '@/components/company_component'
import {  setglobalPostPerWeek, setGlobalTags, setGlobalWebsite, setGlobalWebsiteDescription,  } from '@/lib/globals';
import { redirect, RedirectType } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const page = () => {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className='flex flex-col min-h-screen min-w-screen items-center justify-center gap-y-4 py-2 '>
      <CompanyComponent tags={tags} setTags={(t) => {
        setTags(t);
      } } 
      onSubmit={
        (data: WebsiteData) => {
          if (!data.description || !data.website || !data.postnumber || tags.length == 0) {
            toast("Please fill in the necessary data")
            return
          }

          setGlobalTags(tags)
          setGlobalWebsite(data.website)
          setGlobalWebsiteDescription(data.description)
          setglobalPostPerWeek(data.postnumber)
          redirect('/persona')

        }
      }/>

    </div>
  )
}

export default page
