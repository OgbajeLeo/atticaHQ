export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Validation rules
export const validationRules = {
  required: (value: any, fieldName: string): ValidationError | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { field: fieldName, message: `${fieldName} is required` };
    }
    return null;
  },

  minLength: (value: string, min: number, fieldName: string): ValidationError | null => {
    if (value && value.length < min) {
      return { field: fieldName, message: `${fieldName} must be at least ${min} characters long` };
    }
    return null;
  },

  maxLength: (value: string, max: number, fieldName: string): ValidationError | null => {
    if (value && value.length > max) {
      return { field: fieldName, message: `${fieldName} must be no more than ${max} characters long` };
    }
    return null;
  },

  numeric: (value: string, fieldName: string): ValidationError | null => {
    if (value && isNaN(Number(value))) {
      return { field: fieldName, message: `${fieldName} must be a valid number` };
    }
    return null;
  },

  positiveNumber: (value: string, fieldName: string): ValidationError | null => {
    if (value && (isNaN(Number(value)) || Number(value) <= 0)) {
      return { field: fieldName, message: `${fieldName} must be a positive number` };
    }
    return null;
  },

  year: (value: string, fieldName: string): ValidationError | null => {
    if (value) {
      const year = Number(value);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1800 || year > currentYear + 1) {
        return { field: fieldName, message: `${fieldName} must be a valid year between 1800 and ${currentYear + 1}` };
      }
    }
    return null;
  },

  url: (value: string, fieldName: string): ValidationError | null => {
    if (value) {
      try {
        new URL(value);
      } catch {
        return { field: fieldName, message: `${fieldName} must be a valid URL` };
      }
    }
    return null;
  },

  youtubeUrl: (value: string, fieldName: string): ValidationError | null => {
    if (value) {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
      if (!youtubeRegex.test(value)) {
        return { field: fieldName, message: `${fieldName} must be a valid YouTube URL` };
      }
    }
    return null;
  },

  minItems: (items: any[], min: number, fieldName: string): ValidationError | null => {
    if (items.length < min) {
      return { field: fieldName, message: `Please select at least ${min} ${fieldName.toLowerCase()}` };
    }
    return null;
  },

  maxFileSize: (base64Strings: string[], maxSizeMB: number, fieldName: string): ValidationError | null => {
    for (const base64 of base64Strings) {
      // Estimate file size from base64 string length
      const sizeInBytes = (base64.length * 3) / 4;
      if (sizeInBytes > maxSizeMB * 1024 * 1024) {
        return { field: fieldName, message: `${fieldName} file size must be less than ${maxSizeMB}MB` };
      }
    }
    return null;
  },

  allowedFileTypes: (base64Strings: string[], allowedTypes: string[], fieldName: string): ValidationError | null => {
    for (const base64 of base64Strings) {
      // Check if base64 string starts with the expected image type
      const isImage = base64.startsWith('data:image/');
      if (!isImage) {
        return { field: fieldName, message: `${fieldName} must be one of: ${allowedTypes.join(', ')}` };
      }
    }
    return null;
  }
};

// Validation functions for each step
export const validateOverviewStep = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Property title validation
  const titleError = validationRules.required(formData.propertyTitle, 'Property Title');
  if (titleError) errors.push(titleError);
  else {
    const titleLengthError = validationRules.minLength(formData.propertyTitle, 5, 'Property Title');
    if (titleLengthError) errors.push(titleLengthError);
  }

  // Property type validation
  const typeError = validationRules.required(formData.propertyType, 'Property Type');
  if (typeError) errors.push(typeError);

  // Category validation
  const categoryError = validationRules.required(formData.category, 'Category');
  if (categoryError) errors.push(categoryError);

  // Price validation
  const annualPriceError = validationRules.required(formData.annualPrice, 'Annual Price');
  if (annualPriceError) errors.push(annualPriceError);
  else {
    const annualPricePositiveError = validationRules.positiveNumber(formData.annualPrice.toString(), 'Annual Price');
    if (annualPricePositiveError) errors.push(annualPricePositiveError);
  }

  const monthlyPriceError = validationRules.required(formData.monthlyPrice, 'Monthly Price');
  if (monthlyPriceError) errors.push(monthlyPriceError);
  else {
    const monthlyPricePositiveError = validationRules.positiveNumber(formData.monthlyPrice.toString(), 'Monthly Price');
    if (monthlyPricePositiveError) errors.push(monthlyPricePositiveError);
  }

  // Description validation
  const descriptionError = validationRules.required(formData.description, 'Description');
  if (descriptionError) errors.push(descriptionError);
  else {
    const descLengthError = validationRules.minLength(formData.description, 20, 'Description');
    if (descLengthError) errors.push(descLengthError);
  }

  // Photos validation
  const photosError = validationRules.minItems(formData.photos, 1, 'Photos');
  if (photosError) errors.push(photosError);
  else {
    const fileSizeError = validationRules.maxFileSize(formData.photos, 10, 'Photos');
    if (fileSizeError) errors.push(fileSizeError);
    
    const fileTypeError = validationRules.allowedFileTypes(formData.photos, ['image/'], 'Photos');
    if (fileTypeError) errors.push(fileTypeError);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateListingDetailsStep = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Size validation
  const sizeError = validationRules.required(formData.sizeInFt, 'Size');
  if (sizeError) errors.push(sizeError);
  else {
    const sizeNumericError = validationRules.positiveNumber(formData.sizeInFt, 'Size');
    if (sizeNumericError) errors.push(sizeNumericError);
  }

  // Bedrooms validation
  const bedroomsError = validationRules.required(formData.numberOfBedrooms, 'Number of Bedrooms');
  if (bedroomsError) errors.push(bedroomsError);
  else {
    const bedroomsNumericError = validationRules.positiveNumber(formData.numberOfBedrooms, 'Number of Bedrooms');
    if (bedroomsNumericError) errors.push(bedroomsNumericError);
  }

  // Bathrooms validation
  const bathroomsError = validationRules.required(formData.numberOfBathrooms, 'Number of Bathrooms');
  if (bathroomsError) errors.push(bathroomsError);
  else {
    const bathroomsNumericError = validationRules.positiveNumber(formData.numberOfBathrooms, 'Number of Bathrooms');
    if (bathroomsNumericError) errors.push(bathroomsNumericError);
  }

  // Kitchens validation
  const kitchensError = validationRules.required(formData.numberOfKitchens, 'Number of Kitchens');
  if (kitchensError) errors.push(kitchensError);
  else {
    const kitchensNumericError = validationRules.positiveNumber(formData.numberOfKitchens, 'Number of Kitchens');
    if (kitchensNumericError) errors.push(kitchensNumericError);
  }

  // Garages validation
  const garagesError = validationRules.required(formData.numberOfGarages, 'Number of Garages');
  if (garagesError) errors.push(garagesError);
  else {
    const garagesNumericError = validationRules.positiveNumber(formData.numberOfGarages, 'Number of Garages');
    if (garagesNumericError) errors.push(garagesNumericError);
  }

  // Year built validation
  const yearError = validationRules.required(formData.yearBuilt, 'Year Built');
  if (yearError) errors.push(yearError);
  else {
    const yearValidError = validationRules.year(formData.yearBuilt.toString(), 'Year Built');
    if (yearValidError) errors.push(yearValidError);
  }

  // Floors validation
  const floorsError = validationRules.required(formData.floorsNo, 'Number of Floors');
  if (floorsError) errors.push(floorsError);
  else {
    const floorsNumericError = validationRules.positiveNumber(formData.floorsNo, 'Number of Floors');
    if (floorsNumericError) errors.push(floorsNumericError);
  }

  // Architecture type validation
  const architectureError = validationRules.required(formData.architectureType, 'Architecture Type');
  if (architectureError) errors.push(architectureError);

  // Video URL validation (optional but must be valid if provided)
  if (formData.videoUrl) {
    const videoUrlError = validationRules.youtubeUrl(formData.videoUrl, 'Video URL');
    if (videoUrlError) errors.push(videoUrlError);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateAmenitiesStep = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Amenities validation
  const amenitiesError = validationRules.minItems(formData.amenities, 3, 'Amenities');
  if (amenitiesError) errors.push(amenitiesError);

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateLocationStep = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Property location validation
  const locationError = validationRules.required(formData.propertyLocation, 'Property Location');
  if (locationError) errors.push(locationError);
  else {
    const locationLengthError = validationRules.minLength(formData.propertyLocation, 10, 'Property Location');
    if (locationLengthError) errors.push(locationLengthError);
  }

  // Closest landmark validation
  const landmarkError = validationRules.required(formData.closestLandmark, 'Closest Landmark');
  if (landmarkError) errors.push(landmarkError);
  else {
    const landmarkLengthError = validationRules.minLength(formData.closestLandmark, 3, 'Closest Landmark');
    if (landmarkLengthError) errors.push(landmarkLengthError);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Helper function to get field error
export const getFieldError = (errors: ValidationError[], fieldName: string): string | null => {
  const error = errors.find(error => error.field === fieldName);
  return error ? error.message : null;
};
