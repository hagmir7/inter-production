import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils';

function ViewRole() {
  const { id } = useParams();
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getPermissions(), getRolePermissions()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getRolePermissions = async () => {
    const response = await api.get(`roles/permissions/${id}`);
    setRole(response.data);
    
    // Initialize selected permissions from role
    if (response.data && response.data.permissions) {
      const rolePerms = response.data.permissions.map(p => p.name || p);
      setSelectedPermissions(rolePerms);
    }
  };


  function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getPermissions = async () => {
    const response = await api.get(`permissions`);
    setPermissions(response.data || []);
  };

  // Check if a permission is selected
  const isPermissionSelected = (permissionName) => {
    return selectedPermissions.includes(permissionName);
  };

  // Toggle permission selection
  const togglePermission = (permissionName) => {
    setSelectedPermissions(prevSelected => {
      if (prevSelected.includes(permissionName)) {
        return prevSelected.filter(p => p !== permissionName);
      } else {
        return [...prevSelected, permissionName];
      }
    });
  };

  // Save updated permissions
  const savePermissions = async () => {
    setSaving(true);
    setSaveMessage({ text: '', type: '' });
    
    try {
        console.log(selectedPermissions);
        
      const response = await api.post(`role/${id}/permissions`, {
        permissions: selectedPermissions
      });
      
      setSaveMessage({ 
        text: 'Permissions updated successfully!', 
        type: 'success' 
      });
      
      // Refresh role data
      getRolePermissions();
    } catch (error) {
      console.error("Error saving permissions:", error);
      setSaveMessage({ 
        text: 'Failed to update permissions. Please try again.', 
        type: 'error' 
      });
    } finally {
      setSaving(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  // Group permissions by category for better organization
  const groupedPermissions = permissions.reduce((groups, permission) => {
    const category = permission.category || '';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      {/* Header */}
      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
          {role?.name || 'Role'} Permissions
        </h2>
        <div className="inline-flex gap-x-2">
          <button 
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            onClick={savePermissions}
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Status message */}
        {saveMessage.text && (
          <div className={`mb-4 p-3 rounded-lg ${saveMessage.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
            {saveMessage.text}
          </div>
        )}

        {/* Role basic information */}
        {role && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg dark:bg-neutral-800">
            <h3 className="text-lg font-medium text-gray-800 dark:text-neutral-200 ">
                <span className='border-1 p-2 rounded-lg shadow-sm text-gray-600'>{capitalizeFirst(role.role)}</span>
            </h3>
          </div>
        )}

        {/* Permissions checkboxes */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800 dark:text-neutral-200">Permissions</h3>
            <div className="text-sm text-gray-500 dark:text-neutral-400">
              {selectedPermissions.length} permission(s) selected
            </div>
          </div>
          
          {Object.keys(groupedPermissions).length === 0 ? (
            <p className="text-gray-500 dark:text-neutral-400">No permissions available</p>
          ) : (
            Object.entries(groupedPermissions).map(([category, perms]) => (
              <div key={category} className="mb-6">
                <h4 className="text-md font-medium text-gray-700 dark:text-neutral-300 mb-3">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {perms.map(permission => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`permission-${permission.id}`}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        checked={isPermissionSelected(permission.name)}
                        onChange={() => togglePermission(permission.name)}
                      />
                      <label 
                        htmlFor={`permission-${permission.id}`} 
                        className="ml-2 block text-sm text-gray-700 dark:text-neutral-300 cursor-pointer"
                      >
                        {permission.name}
                        {permission.description && (
                          <p className="text-xs text-gray-500 dark:text-neutral-400">{permission.description}</p>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewRole;