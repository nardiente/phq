import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './styles.css';
import { useUser } from '../../contexts/UserContext';
import { putApi } from '../../utils/api/api';
import { WindowIcon } from '../icons/window.icon';

interface Props {
  open: boolean;
}

export const AddYourBoardModal = ({ open }: Props) => {
  const { initialUser, user, setUser } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [showAddBoard, setShowAddBoard] = useState<boolean>(open);

  useEffect(() => {
    setShowAddBoard(open);
  }, [open]);

  const stopRemind = ({
    stop_remind_add_board,
    remind_3_days,
  }: {
    stop_remind_add_board?: boolean;
    remind_3_days?: boolean;
  }) => {
    setLoading(true);
    putApi('users/me', { stop_remind_add_board, remind_3_days }).then((res) => {
      if (res.results.data) {
        setUser((user) =>
          user
            ? { ...user, user: res.results.data }
            : { ...initialUser, user: res.results.data }
        );
        setShowAddBoard(false);
      }
      setLoading(false);
    });
  };

  return (
    <Modal id="addYourBoardModal" isOpen={showAddBoard}>
      <ModalHeader>
        <a
          className={`text-purple-600 hover:text-purple-700 hover:underline ${loading ? 'disabled' : ''}`}
          onClick={() =>
            !loading ? stopRemind({ stop_remind_add_board: true }) : {}
          }
          aria-disabled={loading}
        >
          Close and don&apos;t show again.
        </a>
      </ModalHeader>
      <ModalBody className="add-board">
        <div className="add-board">
          <div className="add-board-card">
            <WindowIcon />
            <div className="card-text">
              <span className="board-card-header">
                Add your board to your website.
              </span>
              <span>
                <a
                  href="https://support.producthq.io/articles/how-to-add-a-board-to-your-site-145e70-32dd7"
                  className="text-purple-600 hover:text-purple-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Doc: How To Add A Board To Your Site
                </a>
              </span>
              <div className="board-card-footer">
                <span>{`${user?.project?.portal_subdomain}.producthq.io`}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${user?.project?.portal_subdomain}.producthq.io}`
                    );
                    toast(
                      'Default Domain Name successfully copied to clipboard',
                      {
                        position: 'bottom-center',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        pauseOnFocusLoss: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark',
                        bodyClassName: 'p-2',
                        className: 'custom-theme',
                      }
                    );
                  }}
                >
                  <img src="https://s3.amazonaws.com/uat-app.productfeedback.co/icon/updated_copy.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <a
          className={`text-purple-600 hover:text-purple-700 hover:underline ${loading ? 'disabled' : ''}`}
          onClick={() => (!loading ? stopRemind({ remind_3_days: true }) : {})}
          aria-disabled={loading}
        >
          Remind me in 3 days.
        </a>
      </ModalFooter>
    </Modal>
  );
};
