import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function FriendInfo({ friend }) {
  return (
    <>
      <h5 className='mt-5'>Friend Information</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' /> {friend.name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon' /> {friend.email}
        </li>
        <li className='list-group-item'>
          <FaPhone className='icon' /> {friend.phone}
        </li>
      </ul>
    </>
  );
}
