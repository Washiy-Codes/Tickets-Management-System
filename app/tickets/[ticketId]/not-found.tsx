import { Placeholder } from '@/components/placeholder';
import { Button } from '@/components/ui/button';
import { ticketsPath } from '@/paths';
import Link from 'next/link';


const NotFound = () => {
    return (
        <Placeholder label="Ticket not found." button = 
             <Button>
            <Link href={ticketsPath()}>Back to Tickets</Link>
            </Button>
                />
    )
}
export default NotFound;