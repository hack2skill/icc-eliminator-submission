package com.sundartech.cricfen.sqlitedatabase;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;

import com.sundartech.cricfen.model.TransactionMoney;

import java.util.ArrayList;
import java.util.List;

public class SQLiteDB {

    //ADD MOVIE TO FAVOURIRTE
    public static void addToTransactionMoneyHistory(Context context, String title, String status, String time,
                                     String amount, String type) {
        if (title == null) return;
        DatabaseHelper databaseHelper = new DatabaseHelper(context);
        SQLiteDatabase database = databaseHelper.getWritableDatabase();

        ContentValues contentValues = new ContentValues();
        contentValues.put(DatabaseHelper.TITLE, title);
        contentValues.put(DatabaseHelper.STATUS, status);
        contentValues.put(DatabaseHelper.TIME, time);
        contentValues.put(DatabaseHelper.AMOUNT, amount);
        contentValues.put(DatabaseHelper.TYPE, type);
        database.insert(DatabaseHelper.TRANSACTION_MONEY, null, contentValues);
        database.close();
    }

    public static List<TransactionMoney> getTransactionMoneyHistoryBriefs(Context context) {
        DatabaseHelper databaseHelper = new DatabaseHelper(context);
        SQLiteDatabase database = databaseHelper.getReadableDatabase();

        List<TransactionMoney> listTransactionMoneyHistory = new ArrayList<>();
        Cursor cursor = database.query(DatabaseHelper.TRANSACTION_MONEY, null, null, null, null, null, DatabaseHelper.ID + " DESC");
        while (cursor.moveToNext()) {
            @SuppressLint("Range") int id = cursor.getInt(cursor.getColumnIndex(DatabaseHelper.ID));
            @SuppressLint("Range") String title = cursor.getString(cursor.getColumnIndex(DatabaseHelper.TITLE));
            @SuppressLint("Range") String status = cursor.getString(cursor.getColumnIndex(DatabaseHelper.STATUS));
            @SuppressLint("Range") String time = cursor.getString(cursor.getColumnIndex(DatabaseHelper.TIME));
            @SuppressLint("Range") String amount = cursor.getString(cursor.getColumnIndex(DatabaseHelper.AMOUNT));
            @SuppressLint("Range") String type = cursor.getString(cursor.getColumnIndex(DatabaseHelper.TYPE));

            TransactionMoney transactionMoney = new TransactionMoney(id, title, status, time, type, amount);
            listTransactionMoneyHistory.add(transactionMoney);
        }
        cursor.close();
        database.close();
        return listTransactionMoneyHistory;
    }
}
