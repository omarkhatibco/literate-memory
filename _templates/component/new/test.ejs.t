---
to: src/components/<%= name %>/<%= name %>.test.tsx
---
import { render, screen } from '@testing-library/react';

import {<%= name %>} from './<%= name %>';
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('<%= name %>', () => {
    it('renders button', () => {
        render(<BrowserRouter><<%= name %> /></BrowserRouter>);
    });

});