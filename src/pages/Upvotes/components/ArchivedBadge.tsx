import { ArchiveIcon } from '../../../components/icons/archive.icon';

const ArchivedBadge = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={
        'w-full bg-[#f0f0f0] text-[#888] p-[20px] text-[14px] flex gap-2 items-center' +
        ` ${className}`
      }
    >
      <ArchiveIcon />
      This Idea has been archived.
    </div>
  );
};

export default ArchivedBadge;
