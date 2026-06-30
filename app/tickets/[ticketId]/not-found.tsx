import { Placeholder } from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { ticketsPath } from '@/paths';
import Link from 'next/link';


const NotFound = () => {
    return (
        <Placeholder label="We could not find your ticket." button = 
         {<Button variant="default" size="sm" className="w-full">
            <Link href={ticketsPath()}>Back to Tickets</Link>
         </Button>}
                
        />
    )
}
export default NotFound;