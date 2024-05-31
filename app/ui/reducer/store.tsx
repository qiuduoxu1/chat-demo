// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    selectedChatId: number | null,
    convId: String | null,
    maskId: number | null
}

const initialState: ChatState = {
    selectedChatId: null,
    convId: null,
    maskId: null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedChatId: (state, action: PayloadAction<{ selectedChatId: number, convId: String, maskId: number }>) => {
            state.selectedChatId = action.payload.selectedChatId,
                state.convId = action.payload.convId,
                state.maskId = action.payload.maskId
        },

    },
});

export const { setSelectedChatId } = chatSlice.actions;

const store = configureStore({
    reducer: {
        chat: chatSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
