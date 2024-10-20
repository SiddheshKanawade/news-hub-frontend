import Papa from 'papaparse';
import React, { useState, useEffect, useRef } from 'react';

function timeDifference(publishedAt) {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffInMs = now - publishedDate; // Difference in milliseconds

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
        return seconds <= 1 ? "just now" : `${seconds} seconds ago`;
    }
}

async function loadTickersFromCSV() {
    try {
        const response = await fetch('/nse.csv');
        const csvText = await response.text();
        // Use PapaParse to parse the CSV data
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,  // Assuming the CSV has headers like "NAME OF COMPANY"
                dynamicTyping: true,
                complete: (results) => {
                    resolve(results.data);  // This will give an array of objects from CSV
                },
                error: (error) => reject(error),
            });
        });
    } catch (error) {
        console.error('Error loading tickers from CSV:', error);
        return [];
    }
}

function getDateRange() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);

    thirtyDaysAgo.setDate(today.getDate() - 60);

    const formattedStartDate = thirtyDaysAgo.toISOString();
    const formattedEndDate = today.toISOString();

    return { formattedStartDate, formattedEndDate };
}




export { timeDifference, loadTickersFromCSV, getDateRange };