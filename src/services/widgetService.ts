import axios from 'axios';
import { Widget } from '../contexts/WidgetContext/type';

const API_URL = import.meta.env.VITE_API_HOST;

export const widgetService = {
  // Get all widgets
  async getAllWidgets(): Promise<Widget[]> {
    try {
      const response = await axios.get(`${API_URL}/widgets`);
      return response.data.widgets || [];
    } catch (error) {
      console.error('❌ WidgetService: Error:', error);
      throw error;
    }
  },

  // Save widget
  async saveWidget(widget: Widget): Promise<Widget> {
    const response = await axios.post(`${API_URL}/widgets`, widget);
    return response.data;
  },

  // Delete widget
  async deleteWidget(id: string): Promise<void> {
    await axios.delete(`${API_URL}/widgets/${id}`);
  },

  // Get single widget
  async getWidget(id: string): Promise<Widget | undefined> {
    const response = await axios.get(`${API_URL}/widgets/${id}`);
    return response.data;
  },

  // Update widget status
  async updateWidgetStatus(
    id: string,
    status: 'draft' | 'published'
  ): Promise<Widget | undefined> {
    const widget = await this.getWidget(id);
    if (widget) {
      const response = await axios.patch(`${API_URL}/widgets/${id}`, {
        status,
        lastUpdated: new Date().toISOString(),
      });
      return response.data;
    }
    return undefined;
  },
};
