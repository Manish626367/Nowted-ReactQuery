
'use client'

import RestoreNoteCompo from '@/right/RestoreNoteCompo';
import ShowNotesContent from '@/right/ShowNotesContent';
import { usePathname } from 'next/navigation';
import React from 'react'

function NotePage() {
   const pathname = usePathname();
   if (pathname.includes("Archived")) return <ShowNotesContent/>;
   if (pathname.includes("favorites")) return <ShowNotesContent/>;
   if (pathname.includes("Deleted")) return <RestoreNoteCompo/>
  return (
    <>
        page not found
    </>
  )
}

export default NotePage
