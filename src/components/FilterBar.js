import React from 'react';
import { GROUPS } from '../data';

const FilterBar = ({ searchQuery, handleQueryShift, selectedGroup, onGroupChange }) => {
  return (
    <div className="filter-bar">
      <div className="form-group">
        <label htmlFor="search">Tìm kiếm</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleQueryShift}
          placeholder="Tìm theo tên hoặc số điện thoại..."
        />
      </div>
      <div className="form-group">
        <label htmlFor="group">Nhóm</label>
        <select
          id="group"
          value={selectedGroup}
          onChange={(e) => onGroupChange(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {GROUPS.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
