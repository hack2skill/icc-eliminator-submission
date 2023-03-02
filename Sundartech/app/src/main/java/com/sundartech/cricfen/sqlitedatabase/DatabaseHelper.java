package com.sundartech.cricfen.sqlitedatabase;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by hitanshu on 9/8/17.
 */

public class DatabaseHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "cricfen.db";
    public static final String TRANSACTION_MONEY = "transaction_money";

    public static final String ID = "id";
    public static final String TITLE = "title";
    public static final String STATUS = "status";
    public static final String TIME = "time";
    public static final String AMOUNT = "amount";
    public static final String TYPE = "type";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        String queryCreateTransactionHistoryTable = "CREATE TABLE " + TRANSACTION_MONEY + " ( "
                + ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
                + TITLE + " TEXT, "
                + STATUS + " TEXT, "
                + TIME + " TEXT, "
                + AMOUNT + " TEXT, "
                + TYPE + " TEXT)";

        sqLiteDatabase.execSQL(queryCreateTransactionHistoryTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}
