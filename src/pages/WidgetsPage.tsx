import { useState, useEffect, useRef } from 'react';
import WidgetDeleteModal from '../components/WidgetPreview/widgets/WidgetDeleteModal';
import { GetCodeModal } from '../components/WidgetPreview/widgets/GetCodeModal';
import { Loader } from 'lucide-react';
import { Settings } from '../components/Settings';
import SettingsHeader from '../components/SettingsHeader';
import Button from '../components/Button';
import { WidgetForm } from '../components/WidgetForm';
import {
  defaultWidgetConfig,
  WidgetStatus,
} from '../contexts/WidgetContext/type';
import { useWidget } from '../contexts/WidgetContext/WidgetProvider';
import { CodeSnippet } from '../types/tracking';
import { getApi } from '../utils/api/api';

export default function WidgetsPage() {
  const {
    state: { fetching, widgets },
    deleteWidget,
    listWidgets,
    setWidgetConfig,
    updateWidget,
  } = useWidget();

  const [code, setCode] = useState<string>('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [widgetToDelete, setWidgetToDelete] = useState<number>();
  const [openDropdownId, setOpenDropdownId] = useState<number>();
  const [isGetCodeModalOpen, setIsGetCodeModalOpen] = useState(false);
  const [selectedWidgetKey, setSelectedWidgetKey] = useState('');
  const [showWidgetForm, setShowWidgetForm] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listWidgets();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(undefined);
        listWidgets();
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (!openDropdownId) {
      listWidgets();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  useEffect(() => {
    if (!showWidgetForm) {
      setOpenDropdownId(undefined);
      setWidgetConfig(defaultWidgetConfig);
      listWidgets();
    }
  }, [showWidgetForm]);

  const handleDeleteClick = (id: number, e: React.MouseEvent) => {
    const dropdown = (e.target as HTMLElement)
      .closest('td')
      ?.querySelector('.dropdown-menu');
    if (dropdown) dropdown.classList.add('hidden');
    setWidgetToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!widgetToDelete) return;
    await deleteWidget(widgetToDelete);
  };

  const handleGetCode = () => {
    getApi<CodeSnippet>({ url: 'trackings/code-snippet' }).then((res) => {
      const { results } = res;
      const { data } = results;
      if (data) {
        setCode(data.snippet);
        setSelectedWidgetKey(data.customer_id.toString()); // We'll need the actual key here
        setIsGetCodeModalOpen(true);
      }
    });
  };

  const handlePublish = async (id: number, status: WidgetStatus) => {
    await updateWidget({ id, status });
    setOpenDropdownId(undefined);
  };

  return !showWidgetForm ? (
    <Settings>
      <SettingsHeader
        title="Widgets"
        description="Create and manage your widgets."
        secondaryButton={
          <Button onClick={handleGetCode} variant="blue">
            Get Code
          </Button>
        }
        primaryButton={
          <Button onClick={() => setShowWidgetForm(true)}>
            <div className="flex gap-2 text-white">
              <span className="mr-2">+</span> Create New
            </div>
          </Button>
        }
      />

      {widgets.length === 0 ? (
        <>
          {fetching ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
              <span className="text-5xl">😊</span>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                You don't have any widgets created yet.
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Now is a great time to add your first entry!
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="px-8">
          <div className="overflow-visible shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Launcher Type
                  </th>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Widget Type
                  </th>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Appearance
                  </th>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Sections
                  </th>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Targeting
                  </th>
                  <th className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {widgets.map((widget) => (
                  <tr key={widget.id}>
                    <td className="px-3 py-2">
                      <div
                        style={{ fontSize: '14px', color: '#374151' }}
                        className="flex items-center gap-2"
                      >
                        {widget.name}
                        {widget.status === 'published' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Published
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div style={{ fontSize: '14px', color: '#374151' }}>
                        Type: {widget.config.launcherType}
                      </div>
                      <div style={{ fontSize: '14px', color: '#374151' }}>
                        Position: {widget.config.launcherPosition}
                      </div>
                      {widget.config.backgroundColor && (
                        <div className="flex items-center gap-1">
                          <span style={{ color: '#374151' }}>Colour:</span>
                          &nbsp;
                          <div
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: widget.config.backgroundColor,
                            }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div style={{ fontSize: '14px', color: '#374151' }}>
                        Type: {widget.config.widgetType}
                      </div>
                      <div style={{ fontSize: '14px', color: '#374151' }}>
                        Size: {widget.config.appearance?.width} ×{' '}
                        {widget.config.appearance?.height}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div
                        className="space-y-2"
                        style={{ fontSize: '14px', color: '#374151' }}
                      >
                        <div>
                          Theme:{' '}
                          {widget.config.appearance?.backgroundColor
                            ? 'Custom'
                            : 'Default'}
                        </div>
                        <div>
                          Scroll:{' '}
                          {widget.config.appearance?.preventScroll
                            ? 'Disabled'
                            : 'Enabled'}
                        </div>
                        {widget.config.appearance?.backgroundColor && (
                          <div className="flex items-center gap-2">
                            Colour:
                            <div
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{
                                backgroundColor:
                                  widget.config.appearance.backgroundColor,
                              }}
                            />
                          </div>
                        )}
                        {widget.config.appearance?.hideCloseButton && (
                          <div>Close button: Hidden</div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div
                        className="space-y-1"
                        style={{ fontSize: '14px', color: '#374151' }}
                      >
                        {widget.config.sections &&
                        (widget.config.sections.ideas ||
                          widget.config.sections.roadmap ||
                          widget.config.sections.announcements) ? (
                          <>
                            <div style={{ fontSize: '14px', color: '#374151' }}>
                              Enabled sections:
                            </div>
                            <div>
                              {widget.config.sections.ideas && (
                                <div
                                  style={{
                                    fontSize: '12px',
                                    color: '#374151',
                                  }}
                                >
                                  • Ideas
                                </div>
                              )}
                              {widget.config.sections.roadmap && (
                                <div
                                  style={{
                                    fontSize: '12px',
                                    color: '#374151',
                                  }}
                                >
                                  • Roadmap
                                </div>
                              )}
                              {widget.config.sections.announcements && (
                                <div
                                  style={{
                                    fontSize: '12px',
                                    color: '#374151',
                                  }}
                                >
                                  • What's New
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div
                        className="space-y-1"
                        style={{ fontSize: '14px', color: '#374151' }}
                      >
                        {widget.config.targeting ? (
                          <>
                            <div>
                              {widget.config.targeting.location || 'All pages'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#374151' }}>
                              {widget.config.targeting.devices
                                ? `Devices: ${widget.config.targeting.devices}`
                                : 'All devices'}
                            </div>
                          </>
                        ) : (
                          '-'
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 font-medium relative">
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(widget.id);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                      {openDropdownId === widget.id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-0 z-10 mt-2 w-24 bg-white rounded-md shadow-lg origin-top-right focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex={-1}
                        >
                          <div>
                            <button
                              className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                              role="menuitem"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowWidgetForm(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                              role="menuitem"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDeleteClick(widget.id ?? 0, e);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="text-gray-700 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                              role="menuitem"
                              onClick={() =>
                                handlePublish(
                                  widget.id ?? 0,
                                  widget.status === 'published'
                                    ? 'draft'
                                    : 'published'
                                )
                              }
                            >
                              {widget.status === 'published'
                                ? 'Unpublish'
                                : 'Publish'}
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <WidgetDeleteModal
          isOpen={isDeleteModalOpen}
          widgetName={widgets.find((w) => w.id === widgetToDelete)?.name || ''}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setWidgetToDelete(undefined);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}

      <GetCodeModal
        code={code}
        isOpen={isGetCodeModalOpen}
        onClose={() => setIsGetCodeModalOpen(false)}
        widgetKey={selectedWidgetKey}
      />
    </Settings>
  ) : (
    <WidgetForm id={openDropdownId} setShowWidgetForm={setShowWidgetForm} />
  );
}
