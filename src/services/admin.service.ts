import { apiClient } from '../config/api.config';
import type { RoleDTO, PermissionDTO } from '../types/api.types';

export const adminService = {
  // Roles
  /**
   * Get all roles
   */
  getAllRoles: async (): Promise<RoleDTO[]> => {
    const response = await apiClient.get<RoleDTO[]>('/api/admin/security/roles');
    return response.data;
  },

  /**
   * Create a new role
   */
  createRole: async (data: { name: string; description?: string }): Promise<RoleDTO> => {
    const response = await apiClient.post<RoleDTO>('/api/admin/security/roles', data);
    return response.data;
  },

  /**
   * Delete a role
   */
  deleteRole: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/security/roles/${id}`);
  },

  /**
   * Get permissions for a role
   */
  getRolePermissions: async (id: number): Promise<RoleDTO> => {
    const response = await apiClient.get<RoleDTO>(`/api/admin/security/roles/${id}/permissions`);
    return response.data;
  },

  /**
   * Update permissions for a role
   */
  updateRolePermissions: async (id: number, permissionIds: number[]): Promise<RoleDTO> => {
    const response = await apiClient.put<RoleDTO>(
      `/api/admin/security/roles/${id}/permissions`,
      permissionIds
    );
    return response.data;
  },

  // Permissions
  /**
   * Get all permissions
   */
  getAllPermissions: async (): Promise<PermissionDTO[]> => {
    const response = await apiClient.get<PermissionDTO[]>('/api/admin/security/permissions');
    return response.data;
  },

  /**
   * Create a new permission
   */
  createPermission: async (data: { name: string; description?: string }): Promise<PermissionDTO> => {
    const response = await apiClient.post<PermissionDTO>('/api/admin/security/permissions', data);
    return response.data;
  },

  /**
   * Delete a permission
   */
  deletePermission: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/security/permissions/${id}`);
  },
};
