import Friends from '../components/Friends';
import AddFriendModal from '../components/AddFriendModal';

export default function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddFriendModal />
      </div>
      <Friends />
      <hr />
      <Friends />
    </>
  );
}
