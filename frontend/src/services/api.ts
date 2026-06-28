const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface SubmitCardPayload {
  cardNumber: string;
  cvv: string;
  cardholderName: string;
  expiration: string;
}

export interface ApiSuccessResponse {
  success: true;
  message: string;
  data: {
    id: string;
    cardholderName: string;
    expiration: Date;
    createdAt: string;
    lastFour: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: string[];
}

export async function submitCard(
  payload: SubmitCardPayload
): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/api/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorData = data as ApiErrorResponse;
    const detailMessage = errorData.details?.join('. ') ?? '';
    throw new Error(
      detailMessage
        ? `${errorData.error}: ${detailMessage}`
        : errorData.error || 'Failed to submit card'
    );
  }

  return data as ApiSuccessResponse;
}
