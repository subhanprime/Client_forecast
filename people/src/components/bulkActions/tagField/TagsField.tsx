import React, { useState } from 'react';
// import { BulkField } from '../constant/enums';
// import { ITagsFields } from '../constant/bulkActions';

function TagsField({ tags, setTags }: any) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTag = (tag: string) => {
    if (tag.trim() !== '' && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag:any) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag(inputValue.trim());
    }
  };
  return (
    <div className="my-3">
      {/* <h2 className="text-xs font-semibold my-2">Tags</h2> */}
      <div className="w-full text-xs max-w-[500px] flex flex-wrap gap-2 border border-gray-300 rounded-md my-2 p-1">
        {tags.map((tag:any) => (
          <div className="bg-gray-200 rounded-md flex items-center px-2">
            <span className="mr-1">{tag}</span>
            <button type="button" onClick={() => removeTag(tag)}>&times;</button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add tags"
          className=" p-2 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default TagsField;
