import SlidingPanel from 'react-sliding-side-panel';
import { usePanel } from '../../contexts/PanelContext';
import { useFeedback } from '../../contexts/FeedbackContext';
import { Fragment } from 'react/jsx-runtime';
import { SubmitIdea } from '../SubmitIdea';
import AddComment from '../AddComment';
import SuccessMessage from '../SuccessMessage';
import DeleteConfirmation from '../DeleteConfirmation';
import './styles.css';
import { useEffect } from 'react';

export const SidePanel = () => {
  const {
    state: { isOpen, activePage },
    setActivePage,
    setIsOpen,
  } = usePanel();
  const { setSelectedIdea } = useFeedback();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen]);

  return (
    <SlidingPanel
      type={'right'}
      isOpen={isOpen}
      size={41.67}
      onClosed={() => {
        setActivePage('add_idea');
        setSelectedIdea(null);
      }}
      panelContainerClassName="panel-container"
      backdropClicked={() => activePage == 'success' && setIsOpen(false)}
    >
      <Fragment>
        <div className="header">
          <div>
            {activePage == 'add_idea' && 'Tell us your idea!'}
            {activePage == 'edit_idea' && 'Edit'}
            {activePage == 'add_comment' && 'Upvotes'}
            {activePage == 'delete_idea' && 'Upvotes'}
            {activePage == 'delete_column' && 'Roadmap'}
          </div>
          <div
            className="x-button is-clickable"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </div>
        </div>
        {(activePage == 'add_idea' || activePage == 'edit_idea') && (
          <SubmitIdea />
        )}
        {activePage == 'add_comment' && <AddComment />}
        {activePage == 'success' && <SuccessMessage />}
        {activePage == 'delete' && <DeleteConfirmation />}
      </Fragment>
    </SlidingPanel>
  );
};
